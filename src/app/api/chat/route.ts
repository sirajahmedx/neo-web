import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

interface RequestBody {
  input: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { input }: RequestBody = await req.json();

    if (!input) {
      return new NextResponse(JSON.stringify({ error: 'Input message is required' }), {
        status: 400,
      });
    }

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(input);

    return new NextResponse(JSON.stringify({ response: result.response.text() }), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
