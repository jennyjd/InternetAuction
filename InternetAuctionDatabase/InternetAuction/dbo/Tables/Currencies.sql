CREATE TABLE [dbo].[Currencies]
(
	[Id] TINYINT IDENTITY(1,1) NOT NULL,
	[Name] NVARCHAR(10) NULL,
	[ShortName] NVARCHAR(5) NOT NULL,

	CONSTRAINT [primaryCurrencyKey] PRIMARY KEY ([Id])
)
