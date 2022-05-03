import { Request, Response } from "express";
import Usuario from "../models/usuario";

const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();
  res.json({ usuarios });
};

const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return res
      .status(400)
      .json({ msg: `El usuario con id ${id} no existe en la db` });
  }
  res.json(usuario);
};

const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const existeEmail = await Usuario.findOne({ where: { email: body.email } });

    if (existeEmail) {
      return res
        .status(400)
        .json({ msg: `Ya existe un usuario con mail ${body.email} en la db` });
    }
    const usuario = new Usuario(body);
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Ha ocurrido un error. Contacte al administrador" });
  }
};

const putUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res
        .status(404)
        .json({ msg: `No existe usuario para el id ${id} seleccionado` });
    }

    await usuario.update(body);

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Ha ocurrido un error. Contacte al administrador" });
  }
};

const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res
      .status(404)
      .json({ msg: `No existe usuario para el id ${id} seleccionado` });
  }

  await usuario.update({ estado: false });

  res.json(usuario);
};

export { getUsuario, getUsuarios, postUsuario, putUsuario, deleteUsuario };
