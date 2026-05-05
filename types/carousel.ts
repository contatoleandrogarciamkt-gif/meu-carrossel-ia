export type DesignTemplate = 'clean' | 'alert' | 'premium';
export type CarouselFormat = '1:1' | '4:5' | '3:4';
export type SlideCount = 6 | 8 | 10;

export interface SlideContent {
  number: number;
  headline: string;
  supportText: string;
  type: string;
}

export interface CarouselData {
  slides: SlideContent[];
  caption: string;
  hashtags: string[];
}

export interface GenerationRequest {
  youtubeUrl: string;
  transcript?: string;
  slidesCount: SlideCount;
  format: CarouselFormat;
  designTemplate: DesignTemplate;
}
