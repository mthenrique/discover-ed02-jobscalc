const Profile = require("../model/Profile");

module.exports = {
    async index(req, res){
        return res.render("profile", { profile: await Profile.get() })
    },

    async update(req, res){
        //req.body para pegar os dados
        const data = req.body;

        //definir quantas semanas tem no ano
        const weeksPeryear = 52;

        //Remover as semanas de férias no ano, para pegar quantas semanas tem em 1 mes
        const weeksPerMonth = (weeksPeryear - data["vacation-per-year"]) / 12;

        //Total de horas trabalhadas na semana
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

        //total de horas trabalhadas no mes
        const monthlyTotalHours = weekTotalHours * weeksPerMonth;

        //Qual será o valor da minha hora
        const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;

        const profile = await Profile.get();

        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHour
        });
        
        return res.redirect("/profile");
    }
}