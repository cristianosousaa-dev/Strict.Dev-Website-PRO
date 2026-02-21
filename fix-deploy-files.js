#!/usr/bin/env node

/**
 * Strict.Dev - Fix Deploy Files
 * Converte _headers e _redirects de diretorios (Figma Make)
 * para ficheiros flat (Cloudflare Pages).
 * Executado automaticamente via: npm run build
 */

import fs from 'fs';
import path from 'path';

const FILES = ['_headers', '_redirects'];

FILES.forEach((name) => {
  const target = path.join('public', name);

  // Se ja e ficheiro flat, nada a fazer
  if (fs.existsSync(target) && fs.lstatSync(target).isFile()) {
    console.log(`[ok] public/${name} -- ficheiro flat`);
    return;
  }

  // Se e diretorio (Figma Make cria /public/_headers/main.tsx)
  if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
    const mainTsx = path.join(target, 'main.tsx');
    let content = '';

    if (fs.existsSync(mainTsx)) {
      content = fs.readFileSync(mainTsx, 'utf8');
      console.log(`[fix] public/${name}/main.tsx -> public/${name}`);
    } else {
      console.warn(`[warn] public/${name}/ existe mas sem main.tsx -- criando vazio`);
    }

    // Remove diretorio e cria ficheiro
    fs.rmSync(target, { recursive: true, force: true });
    fs.writeFileSync(target, content, 'utf8');
    console.log(`[ok] public/${name} -- convertido para ficheiro flat`);
    return;
  }

  console.warn(`[warn] public/${name} nao encontrado`);
});

console.log('\n[done] Fix deploy files concluido.');