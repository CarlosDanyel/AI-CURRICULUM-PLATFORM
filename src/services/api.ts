import { api } from '@/lib/axios';

type ResumeDownloadPayload = {
  html: string;
  structure: StructureResumeData;
};

const getResumeUrl = async (payload: ResumeDownloadPayload) => {
  const { data } = await api.post('/resume/download', payload, {
    responseType: 'blob',
  });

  return window.URL.createObjectURL(data);
};

type AiGenerationPayload = {
  jobtitle: string;
  jobDescription: string;
};

const generateContentForJob = async (payload: AiGenerationPayload) => {
  const { data } = await api.post('/generate/job-title', payload);

  return data;
};

const fixContent = async (content: ResumeContentData) => {
  const { data } = await api.post('/generate/fix-content', { content });

  return data;
};

type AiTranslatePayload = {
  content: ResumeContentData;
  language: string;
};

const traslate = async (payload: AiTranslatePayload) => {
  const { data } = await api.post('/generate/translate', payload);

  return data;
};

const getCredits = async () => {
  const { data } = await api.get<{ credits: number }>('/credits');

  return data.credits ?? 0;
};

export const ApiServices = {
  getResumeUrl,
  generateContentForJob,
  fixContent,
  traslate,
  getCredits,
};
