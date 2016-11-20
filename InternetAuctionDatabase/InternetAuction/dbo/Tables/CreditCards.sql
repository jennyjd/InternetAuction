﻿CREATE TABLE [dbo].[CreditCards]
(
	[Id] INT IDENTITY(1,1) NOT NULL,
	[Number] NVARCHAR(50) NOT NULL,
	[Cash] DECIMAL(10, 10) NOT NULL,
	[CurrencyId] TINYINT NOT NULL,
	[UserId] INT NOT NULL,

	CONSTRAINT [primaryCreditCardKey] PRIMARY KEY ([Id]),
	CONSTRAINT [foreignCreditCardsToClientsKey] FOREIGN KEY([UserId])
		REFERENCES Clients ([Id]),
	CONSTRAINT [foreignCreditCardsToCurrenciesKey] FOREIGN KEY([CurrencyId])
		REFERENCES Currencies ([Id])
)