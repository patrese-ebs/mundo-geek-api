import { Router } from "express";
import { ProdutoService } from "../services/ProdutoService.js";
import { validarBody } from "../middlewares/validarBody.js";
import { createProdutoSchema } from "../validates/createProdutoSchema.js";
import { ProdutoController } from "../controllers/ProdutoController.js";

const produtoRoutes = Router();
const produtoService = new ProdutoService();
const produtoController = new ProdutoController(produtoService);

produtoRoutes.post("/", validarBody(createProdutoSchema), (req, res) => produtoController.create(req, res));
produtoRoutes.get("/", (req, res) => produtoController.findAll(req, res));
produtoRoutes.get("/:id", (req, res) => produtoController.findById(req, res));
produtoRoutes.put("/:id", (req, res) => produtoController.update(req, res));
produtoRoutes.delete("/:id", (req, res) => produtoController.delete(req, res));

export default produtoRoutes;