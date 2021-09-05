module.exports = {
    remainingDays(job){
        //Calculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
    
        //Data de criação do job
        const createdDate = new Date(job.created_at);
        //Data de entrega do job
        const dueDay = createdDate.getDate() + Number(remainingDays);
        //Data exata do vencimento em Milissegundos
        const dueDateInMs = createdDate.setDate(dueDay);
        //Diferença do tempo em milissegundos
        const timeDiffInMS = dueDateInMs - Date.now();
    
        //Transformar milisegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24;
    
        const dayDiff = Math.floor(timeDiffInMS / dayInMs);
    
        //Restam x dias
        return dayDiff;
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}