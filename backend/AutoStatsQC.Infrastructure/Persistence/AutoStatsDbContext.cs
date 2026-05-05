using AutoStatsQC.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AutoStatsQC.Infrastructure.Persistence;

public class AutoStatsDbContext : DbContext
{
    public AutoStatsDbContext(DbContextOptions<AutoStatsDbContext> options)
        : base(options)
    {
    }

    public DbSet<VehicleRegistrationStatistic> VehicleRegistrationStatistics { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<VehicleRegistrationStatistic>(entity =>
        {
            entity.OwnsOne(x => x.Province, province =>
            {
                province.Property(p => p.Name)
                    .HasColumnName("Province")
                    .IsRequired();
            });

            entity.HasIndex(x => new
            {
                x.Year,
                x.VehicleType,
                x.FuelType
            })
            .IsUnique();
        });
    }
}