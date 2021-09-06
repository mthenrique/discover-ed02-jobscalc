const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
    async index(req,res){

        const jobs = await Job.get();
        const profile = await Profile.get();
        
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        //total de horas por dia de cada Job em progresso
        let jobTotalHours = 0;

        const updatedJobs = jobs.map((job) => {
            //Ajustes no job
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress';

            //Somando a quantidade de status com base no valor da variavel status = 'done' ou 'progress'
            statusCount[status] += 1; //adiciona +1 em statusCount.progress ou statusCount.done

            //taotal de horas por dia de cada Job em progresso
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours;
            // if(status == 'progress'){
            //     jobTotalHours += Number(job['daily-hours']);
            // }
            
            return {
                //Pega todos os itens de Jobs e espalha dentro do return
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"]),
            };
        });

        //qtd de horas que quero trabalhar MENOS quantdade de horas dia de cada job em progress
        const freeHours = profile['hours-per-day'] - jobTotalHours;
        
        return res.render("index", {
            jobs: updatedJobs, 
            profile: profile, 
            statusCount: statusCount,
            freeHours: freeHours
        });
    }
}
