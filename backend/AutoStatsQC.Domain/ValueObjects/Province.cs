namespace AutoStatsQC.Domain.ValueObjects;

public record Province
{
    public string Name { get; private set; } = string.Empty;

    private Province()
    {
    }

    public Province(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Province invalide");

        Name = name;
    }

    public override string ToString() => Name;
}