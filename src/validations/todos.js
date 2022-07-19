const Yup = require("yup");

exports.createOrUpdate = Yup.object().shape({
  text: Yup.string()
    .min(3, "Text must be at least 3 characters long")
    .max(255)
    .required(),
  priority: Yup.number().min(1).max(10).required(),
  tags: Yup.array().of(Yup.string().required()),
});

exports.updateStatus = Yup.object().shape({
  completed: Yup.boolean().required(),
});
