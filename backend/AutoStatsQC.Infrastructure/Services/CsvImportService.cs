using AutoStatsQC.Domain.Entities;
using AutoStatsQC.Domain.ValueObjects;
using AutoStatsQC.Infrastructure.Persistence;
using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using Microsoft.EntityFrameworkCore;


namespace AutoStatsQC.Infrastructure.Services;

public class CsvImportService
{
    private readonly AutoStatsDbContext _context;

    public CsvImportService(AutoStatsDbContext context)
    {
        _context = context;
    }

    public async Task ImportAsync(string filePath)
    {

        if (await _context.VehicleRegistrationStatistics.AnyAsync())
        {
            return;
        }

        using var reader = new StreamReader(filePath);
        using var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            HasHeaderRecord = true
        });

        var records = csv.GetRecords<dynamic>();

        foreach (var record in records)
        {
            var row = (IDictionary<string, object>)record;

            string province = row["GEO"]?.ToString() ?? "";
            string vehicleType = row["Vehicle type"]?.ToString() ?? "";
            string fuelType = row["Fuel type"]?.ToString() ?? "";
            string valueStr = row["VALUE"]?.ToString() ?? "";
            string date = row["REF_DATE"]?.ToString() ?? "";

            if (province != "Quebec")
                continue;

            if (vehicleType == "Total, vehicle type")
                continue;

            if (!int.TryParse(valueStr, out int value))
                continue;

            int year = int.Parse(date.Split('-')[0]);

            var entity = new VehicleRegistrationStatistic
            {
                Year = year,
                Province = new Province(province),
                VehicleType = vehicleType,
                FuelType = fuelType,
                Value = value
            };

            _context.VehicleRegistrationStatistics.Add(entity);
        }

        await _context.SaveChangesAsync();
    }
}