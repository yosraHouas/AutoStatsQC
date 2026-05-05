using AutoStatsQC.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AutoStatsQC.Api.Endpoints;

public static class VehicleEndpoints
{
    public static void MapVehicleEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/vehicle-types", async (AutoStatsDbContext db) =>
        {
            var types = await db.VehicleRegistrationStatistics
                .Select(x => x.VehicleType)
                .Distinct()
                .OrderBy(x => x)
                .ToListAsync();

            return Results.Ok(types);
        });
    }
}