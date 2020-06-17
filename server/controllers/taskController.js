const { Task } = require('../models');
class Controller {
  static addTask(req, res, next) {
    const newData = req.body;
    console.log(newData);
    Task.create({
      title: newData.title,
      category: newData.category,
      UserId: req.userId,
    })
      .then((data) => {
        res.status(201).json({ message: 'Data berhasil ditambahkan', data });
      })
      .catch(next);
  }

  static getAllTask(req, res, next) {
    Task.findAll()
      .then((data) => {
        res.status(200).json({ message: 'sukses mengamdil semua data', data });
      })
      .catch(next);
  }

  static getOneTask(req, res, next) {
    Task.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        res.status(200).json({ message: 'sukses mengambil data', data });
      })
      .catch(next);
  }

  static update(req, res, next) {
    const edited = req.body;
    const id = req.params.id;
    console.log(edited);
    Task.update(
      {
        title: edited.title,
        category: edited.category,
      },
      {
        where: {
          id,
        },
      }
    )
      .then((data) => {
        res.status(200).json({ message: 'Berhasil mengubah data', data });
      })
      .catch(next);
  }

  static delete(req, res, next) {
    const id = req.params.id;
    Task.destroy({
      where: {
        id: id,
      },
    })
      .then((data) => {
        res.status(200).json({ message: 'Data berhasil dihapus', data });
      })
      .catch(next);
  }
}

module.exports = Controller;
