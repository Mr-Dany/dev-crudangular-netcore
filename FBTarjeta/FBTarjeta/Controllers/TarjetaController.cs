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
        public async Task<IActionResult> Put(int id, [FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                //sino existe retornamos NOT FOUND, sino actualizamos la tarjeta
                if (id != tarjeta.Id) {
                    return NotFound();
                }
                //actualizamos la tarjeta en el contexto 
                //y de forma asincrona nos aseguramos de guardar los cambios 
                _context.Update(tarjeta);
                await _context.SaveChangesAsync();
                // retornamos un mensaje 200 de OK con el mensaje
                return Ok(new {message = "la tarjeta fue actualizada con exito" });

            }
            catch (Exception ex)
            {
                //retornamos mensaje de estado de 400 y el mensaje
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<TarjetaController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                //a la variable trjeta le asignamos el id que de forma asincrona lo obtenemos
                var tarjeta = await _context.TarjetaCredito.FindAsync(id);
                //si el resultado es null (sino se encontro el id) mostramos Not found
                if (tarjeta == null )
                {
                    return NotFound();
                }
                //eliminamos la tarjeta 
                //y de forma asincrona nos aseguramos de guardar los cambios 
                _context.TarjetaCredito.Remove(tarjeta);
                await _context.SaveChangesAsync();
                // retornamos un mensaje 200 de OK con el mensaje
                return Ok(new { message = "la tarjeta fue eliminada con exito" });

            }
            catch (Exception ex)
            {
                //retornamos mensaje de estado de 400 y el mensaje
                return BadRequest(ex.Message);
            }
        }
    }
}
