import { fileURLToPath } from 'url';import { fileURLToPath } from 'url';

import { dirname } from 'path';import { dirname } from 'path';

import express, { type Express } from "express";import express, { type Express } from "express";

import fs from "fs";import fs from "fs";

import path from "path";import path from "path";

import { createServer as createViteServer, createLogger } from "vite";import { createServer as createViteServer, createLogger } from "vite";

import { type Server } from "http";import { type Server } from "http";

import viteConfig from "../vite.config";import viteConfig from "../vite.config";

import { nanoid } from "nanoid";import { nanoid } from "nanoid";



// This file is ONLY for dev. It imports Vite!// This file is ONLY for dev. It imports Vite!



export async function setupVite(app: Express, server: Server) {export async function setupVite(app: Express, server: Server) {

  const serverOptions = {  const serverOptions = {

    middlewareMode: true,    middlewareMode: true,

    hmr: { server },    hmr: { server },

    allowedHosts: true as const,    allowedHosts: true as const,

  };  };



  const viteLogger = createLogger();  const viteLogger = createLogger();



  const vite = await createViteServer({  const vite = await createViteServer({

    ...viteConfig,    ...viteConfig,

    configFile: false,    configFile: false,

    customLogger: {    customLogger: {

      ...viteLogger,      ...viteLogger,

      error: (msg, options) => {      error: (msg, options) => {

        viteLogger.error(msg, options);        viteLogger.error(msg, options);

        process.exit(1);        process.exit(1);

      },      },

    },    },

    server: serverOptions,    server: serverOptions,

    appType: "custom",    appType: "custom",

  });  });



  app.use(vite.middlewares);  app.use(vite.middlewares);



  app.use("*", async (req, res, next) => {  app.use("*", async (req, res, next) => {

    const url = req.originalUrl;    const url = req.originalUrl;



    try {    try {

      // Calculate correct path for client/index.html      // Calculate correct path for client/index.html

      const clientTemplate = path.resolve(      const clientTemplate = path.resolve(

        dirname(fileURLToPath(import.meta.url)),        dirname(fileURLToPath(import.meta.url)),

        "..",        "..",

        "client",        "client",

        "index.html",        "index.html",

      );      );



      let template = await fs.promises.readFile(clientTemplate, "utf-8");      let template = await fs.promises.readFile(clientTemplate, "utf-8");

      template = template.replace(      template = template.replace(

        `src="/src/main.tsx"`,        `src="/src/main.tsx"`,

        `src="/src/main.tsx?v=${nanoid()}"`        `src="/src/main.tsx?v=${nanoid()}"`

      );      );

      const page = await vite.transformIndexHtml(url, template);      const page = await vite.transformIndexHtml(url, template);

      res.status(200).set({ "Content-Type": "text/html" }).end(page);      res.status(200).set({ "Content-Type": "text/html" }).end(page);

    } catch (e) {    } catch (e) {

      vite.ssrFixStacktrace(e as Error);      vite.ssrFixStacktrace(e as Error);

      next(e);      next(e);

    }    }

  });  });

}}