CREATE TABLE [dbo].[CurrenciesConversions]
(
	[Id] INT IDENTITY(1,1) NOT NULL,
	[FromCurrencyId] TINYINT NOT NULL,
	[ToCurrencyId] TINYINT NOT NULL, 
	[Rate] DECIMAL(20, 5) NOT NULL,

	CONSTRAINT primaryCurrenciesConversionsKey PRIMARY KEY ([Id]),
	CONSTRAINT foreignCurrenciesConversionsToCurrenciesFromCurrencyKey FOREIGN KEY([FromCurrencyId])
		REFERENCES Currencies ([Id]),
	CONSTRAINT foreignCurrenciesConversionsToCurrenciesToCurrencyKey FOREIGN KEY([ToCurrencyId])
		REFERENCES Currencies ([Id])
)
