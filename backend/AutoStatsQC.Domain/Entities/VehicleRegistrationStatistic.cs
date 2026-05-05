using AutoStatsQC.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Text;

namespace AutoStatsQC.Domain.Entities
{
    public class VehicleRegistrationStatistic
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public required Province Province { get; set; }
        public string? VehicleType { get; set; }
        public string? FuelType { get; set; }
        public int Value { get; set; }
        public DateTime importedAt { get; set; } = DateTime.UtcNow;
    }
}
