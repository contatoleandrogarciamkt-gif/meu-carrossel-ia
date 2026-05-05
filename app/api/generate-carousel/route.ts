import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { CAROUSEL_PROMPT } from '@/prompts/carouselPrompt';
import { CarouselData, GenerationRequest } from '@/types/carousel';

const MOCK_DATA: CarouselData = {
  slides: [
    { number: 1, headline: "Como Viajar com Pouco Dinheiro", supportText: "Descubra o segredo que as agências não te contam.", type: "gancho" },
    { number: 2, headline: "O Erro que Consome seu Orçamento", supportText: "Muitos viajantes perdem até 30% em taxas desnecessárias.", type: "problema" },
    { number: 3, headline: "Flexibilidade é a Chave", supportText: "Mudar a data em apenas 2 dias pode economizar centenas de reais.", type: "explicação" },
    { number: 4, headline: "Hospedagem Alternativa", supportText: "Além dos hotéis, existem formas quase gratuitas de se hospedar.", type: "curiosidade" },
    { number: 5, headline: "Dica de Ouro: Apps de Cashback", supportText: "Use estas 3 ferramentas para recuperar parte do valor gasto.", type: "dica" },
    { number: 6, headline: "Assista ao Vídeo Completo!", supportText: "Link na Bio do @CanalQueroViajar", type: "CTA" },
  ],
  caption: "Viajar não precisa ser caro! ✈️💰 No vídeo de hoje, mostrei como você pode economizar muito na sua próxima aventura. Confira as dicas do carrossel e corre pro link na bio pra ver o vídeo completo!",
  hashtags: ["#viagem", "#economizar", "#dicasdeviagem", "#viajarbarato", "#canalqueroviajar"]
};

export async function POST(req: Request) {
  try {
    const body: GenerationRequest = await req.json();
    const { youtubeUrl, transcript, slidesCount } = body;

    if (!process.env.OPENAI_API_KEY) {
      console.log('Using mock data because API key is missing');
      return NextResponse.json(MOCK_DATA);
    }

    const prompt = CAROUSEL_PROMPT
      .replace('{youtubeUrl}', youtubeUrl)
      .replace('{transcript}', transcript || 'Nenhuma transcrição fornecida. Use o título e tema do vídeo.')
      .replace('{slidesCount}', slidesCount.toString())
      .replace('{slidesCount}', slidesCount.toString()); // Replaced twice in prompt

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: "Você é um gerador de conteúdo estruturado em JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("Falha ao gerar conteúdo");

    const data: CarouselData = JSON.parse(content);
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error generating carousel:', error);
    return NextResponse.json(
      { error: "Erro ao gerar carrossel. Usando dados simulados.", fallback: MOCK_DATA },
      { status: 200 } // Return 200 with fallback to allow testing
    );
  }
}
