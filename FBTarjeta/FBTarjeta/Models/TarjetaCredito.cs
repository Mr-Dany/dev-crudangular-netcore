using System.ComponentModel.DataAnnotations;

namespace FBTarjeta.Models
{
    public class TarjetaCredito
    {
        
        public int Id { get; set; }
        [Required]
        public int Titular { get; set; }
        [Required]
        public int NumeroTarjeta { get; set; }
        [Required]
        public int FechaExpiracion { get; set; }
        [Required]
        public int Cvv { get; set; }
        //public int MyProperty { get; set; } 
    }
}
