const {parse} = require('csv-parse');
const fs = require ('fs');

function isHabitablePlanet(planet) {
return planet['koi_disposition'] === 'CONFIRMED'
&& planet['koi_prad'] > 0.36 && planet['koi_teq'] > 2.39
}

const habitablePlanets = []

fs.createReadStream('kepler_data.csv')
.pipe(parse({
    comment: '#',
    columns: true,
}))
.on('data', (data) => {
    if(isHabitablePlanet(data)){
    habitablePlanets.push(data)
    }

})

.on('end', () => {
    console.log(habitablePlanets.map((planet) => {
        return planet['kepler_name']
    }))
    console.log(`${habitablePlanets.length} are the only habitable planet`)
})

.on('err', (err) => {
    console.log(err)
})