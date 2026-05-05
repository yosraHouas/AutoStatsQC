using AutoStatsQC.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AutoStatsQC.Api.Endpoints;

public static class StatsEndpoints
{
    public static void MapStatsEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/stats");

        group.MapGet("/", async (
            AutoStatsDbContext db,
            int? year,
            string? vehicleType,
            int page = 1,
            int pageSize = 10
        ) =>
        {
            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 10;
            if (pageSize > 100) pageSize = 100;

            var query = db.VehicleRegistrationStatistics.AsQueryable();

            if (year.HasValue)
                query = query.Where(x => x.Year == year.Value);

            if (!string.IsNullOrWhiteSpace(vehicleType))
                query = query.Where(x => x.VehicleType == vehicleType);

            var total = await query.CountAsync();

            var data = await query
                .OrderBy(x => x.Year)
                .ThenBy(x => x.VehicleType)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Results.Ok(new
            {
                total,
                page,
                pageSize,
                data
            });
        });

        group.MapGet("/count", async (
            AutoStatsDbContext db,
            int? year,
            string? vehicleType
        ) =>
        {
            var query = db.VehicleRegistrationStatistics.AsQueryable();

            if (year.HasValue)
                query = query.Where(x => x.Year == year.Value);

            if (!string.IsNullOrWhiteSpace(vehicleType))
                query = query.Where(x => x.VehicleType == vehicleType);

            var count = await query.CountAsync();

            return Results.Ok(new { count });
        });

        group.MapGet("/chart", async (
      AutoStatsDbContext db,
      int? year,
      string? vehicleType
  ) =>
        {
            var query = db.VehicleRegistrationStatistics.AsQueryable();

            if (year.HasValue)
                query = query.Where(x => x.Year == year.Value);

            if (!string.IsNullOrWhiteSpace(vehicleType))
                query = query.Where(x => x.VehicleType == vehicleType);

            var data = await query
                .GroupBy(x => x.FuelType)
                .Select(g => new
                {
                    fuelType = g.Key,
                    total = g.Sum(x => x.Value)
                })
                .OrderByDescending(x => x.total)
                .ToListAsync();

            return Results.Ok(data);
        });
    }
}