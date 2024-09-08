using FBTarjeta.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FBTarjeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetaController : ControllerBase
    {
        //variable de solo lectura 
        private readonly AplicationDbContext _context;
        //constructor de la clase TarjetaController
        public TarjetaController(AplicationDbContext context) {
            _context = context; 
        }
        // GET: api/<TarjetaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                //recibe de manera asincrona una lista de todos los registros de la tabla TarjetaCredito en BD
                //y se le asigna a la variable listTarjetas 
                var listTarjetas = await _context.TarjetaCredito.ToListAsync();
                // retornamos un mensaje 200 de OK con la lista
                return Ok(listTarjetas);
            }
            catch (Exception ex)
            {
                //retornamos mensaje de estado de 400 y el mensaje
                return BadRequest(ex.Message);
            }
        }

        // GET api/<TarjetaController>/5
        /*[HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }*/

        // POST api/<TarjetaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                //agregamos la tarjeta al contexto 
                //y de forma asincrona nos aseguramos de guardar los cambios 
                _context.Add(tarjeta);
                await _context.SaveChangesAsync();
                // retornamos un mensaje 200 de OK con la lista
                return Ok(tarjeta);

            }
            catch (Exception ex)
            {
                //retornamos mensaje de estado de 400 y el mensaje
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<TarjetaController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TarjetaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
