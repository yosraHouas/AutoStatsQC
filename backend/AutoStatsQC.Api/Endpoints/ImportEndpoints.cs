using AutoStatsQC.Infrastructure.Services;

namespace AutoStatsQC.Api.Endpoints;

public static class ImportEndpoints
{
    public static void MapImportEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/import", async (
            CsvImportService service,
            IWebHostEnvironment env
        ) =>
        {
            var path = Path.Combine(env.ContentRootPath, "Data", "2010002501.csv");

            await service.ImportAsync(path);

            return Results.Ok("Import terminé");
        });
    }
}