'use server';

import { Lambda1Response } from '@/app/models/lambda1';
import { Lambda2Response } from '@/app/models/lambda2';
import { Lambda3Response } from '../models/lambda3';

const LAMBDA1_URL = "https://83rj7op87j.execute-api.us-east-1.amazonaws.com/lotus/descargar_video";
const LAMBDA2_URL = "https://83rj7op87j.execute-api.us-east-1.amazonaws.com/lotus/contenido";
const LAMBDA3_URL = "https://83rj7op87j.execute-api.us-east-1.amazonaws.com/lotus/recomendaciones";

export async function fetchLambda1(url: string): Promise<Lambda1Response> {
  console.log('url:', url);
  let materia = null;
  let lambda1Response = null;
  while (!materia) {
    const response = await fetch(`${LAMBDA1_URL}?url=${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    lambda1Response = await response.json();
    materia = lambda1Response?.data?.materia;
    if (!materia) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  if (!lambda1Response) throw new Error('La respuesta es nula');
  return lambda1Response;
}

export async function fetchLambda2(perfil: string, materia: string, clase: string, tipoContenido: string): Promise<Lambda2Response> {
  const response = await fetch(`${LAMBDA2_URL}?perfil=${perfil}&materia=${materia}&clase=${clase}&tipo_contenido=${tipoContenido}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json();
}

export async function fetchLambda3(perfil: string, clase: string): Promise<Lambda3Response> {
  console.log('url:', `${LAMBDA3_URL}?perfil=${perfil}&clase=${clase}`);
  const response = await fetch(`${LAMBDA3_URL}?perfil=${perfil}&clase=${clase}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json();
}