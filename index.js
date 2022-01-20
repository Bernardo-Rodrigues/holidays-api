import express from 'express';
import {holidays} from "./holidays.js";
import dayjs from 'dayjs';

const server = express();

server.get("/holidays", (req, res) => {
    res.send(holidays);
});

server.get('/holidays/:month', (req, res) => {
    const month = req.params.month;
    res.send(holidays.filter( holiday => {
        const holidayMonth = dayjs(holiday.date).format("M")
        return month === holidayMonth
    }))
});

server.get("/is-today-holiday", (req, res) => {
    const hoje = dayjs().format("M/D/YYYY");
    const todayHoliday = holidays.find( holiday => holiday.date === hoje)

    if(todayHoliday) res.send(`Sim, hoje é ${todayHoliday.name}`)
    else res.send(`Não, hoje não é feriado`)
});

server.listen(3000);