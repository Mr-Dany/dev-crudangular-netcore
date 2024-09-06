using FBTarjeta.Models;
using Microsoft.EntityFrameworkCore;

namespace FBTarjeta
{
    public class AplicationDbContext : DbContext
    {
        DbSet<TarjetaCredito> TarjetaCredito { get; set; }
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options): base(options)    
        {

        }
    }
}
