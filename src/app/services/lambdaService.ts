'use server';

import { Lambda1Response } from '@/app/models/lambda1';
import { Lambda2Response } from '@/app/models/lambda2';
import prisma from '@/app/db/db';

const LAMBDA1_URL = "https://83rj7op87j.execute-api.us-east-1.amazonaws.com/lotus/test_descargar_video";
const LAMBDA2_URL = "https://83rj7op87j.execute-api.us-east-1.amazonaws.com/lotus/test_contenido"

export async function fetchLambda1(url: string) {
  const response = await fetch(`${LAMBDA1_URL}?url=${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
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