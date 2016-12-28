CREATE TABLE [dbo].[AuctionsHistory]
(
	[Id] INT IDENTITY(1,1) NOT NULL,
	[ClientId] INT NOT NULL,
	[AuctionId] INT NOT NULL,
	[CreditCardId] INT NOT NULL,
	[CreditCardCurrencyId] TINYINT NOT NULL,
	[CreditCardSum] DECIMAL(20, 5) NOT NULL,
	[BetSum] DECIMAL(20, 5) NOT NULL,
	[Date] DATETIME NOT NULL,

	CONSTRAINT primaryAuctionsHistoryKey PRIMARY KEY ([Id]),
	CONSTRAINT foreignAuctionsHistoryToClientsKey FOREIGN KEY ([ClientId])
		REFERENCES Clients ([Id]),
	CONSTRAINT foreignAuctionsHistoryToAuctionsKey FOREIGN KEY ([AuctionId])
		REFERENCES Auctions ([Id]),
	CONSTRAINT foreignAuctionsHistoryToCreditCardsKey FOREIGN KEY ([CreditCardId])
		REFERENCES CreditCards ([Id]),
	CONSTRAINT foreignAuctionsHistoryToCurrenciesKey FOREIGN KEY ([CreditCardCurrencyId])
		REFERENCES Currencies ([Id])
)
