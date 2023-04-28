const {literal} = require('sequelize')

const literalQueryUrlImage = (
    req,
    entity,
    nameImage,
    field,
) => {
    const urlImage = (req) =>
    `${req.protocol}://${req.get("host")}/image/${entity}/`;
    /* field = campo */
    return [literal(`CONCAT('${urlImage(req)}',${nameImage})`),field];
};

module.exports = literalQueryUrlImage
