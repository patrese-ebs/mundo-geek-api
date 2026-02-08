import { Router } from "express";
import { CategoriaService } from "../services/CategoriaService.js";
import { validarBody } from "../middlewares/validarBody.js";
import { createCategoriaSchema } from "../validates/createCategoriaSchema.js";
import { CategoriaController } from "../controllers/CategoriaController.js";

const categoriaRoutes = Router();
const categoriaService = new CategoriaService();
const categoriaController = new CategoriaController(categoriaService);

categoriaRoutes.post("/", validarBody(createCategoriaSchema), (req, res) => categoriaController.create(req, res));
categoriaRoutes.get("/", (req, res) => categoriaController.findAll(req, res));
categoriaRoutes.get("/:id", (req, res) => categoriaController.findById(req, res));
categoriaRoutes.put("/:id", (req, res) => categoriaController.update(req, res));
categoriaRoutes.delete("/:id", (req, res) => categoriaController.delete(req, res));

export default categoriaRoutes;