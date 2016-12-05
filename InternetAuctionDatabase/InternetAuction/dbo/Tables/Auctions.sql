CREATE TABLE [dbo].[Auctions]
(
	[Id] INT IDENTITY(1,1) NOT NULL,
	[Name] NVARCHAR(50) NOT NULL,
	[Description] NVARCHAR(1000) NULL,
	[StartPrice] DECIMAL NOT NULL,
	[PriceOfFastSell] DECIMAL NULL,
	[CategoryId] SMALLINT NOT NULL,
	[StartDate] DATETIME NOT NULL,
	[EndDate] DATETIME NOT NULL,
	[CurrencyId] TINYINT NOT NULL,
	[ClientId] INT NOT NULL,
	[GoodStateId] INT NOT NULL,
	[IsCompleted] BIT NOT NULL

	CONSTRAINT primaryAuctionsKey PRIMARY KEY ([Id]),
	CONSTRAINT foreignAuctionsToCategoriesKey FOREIGN KEY ([CategoryId])
		REFERENCES AuctionsCategories ([Id]),
	CONSTRAINT foreignAuctionsToClientsKey FOREIGN KEY ([ClientId])
		REFERENCES Clients ([Id]),
	CONSTRAINT foreignAuctionsToCurrenciesKey FOREIGN KEY ([CurrencyId])
		REFERENCES Currencies ([Id]),
	CONSTRAINT foreignAuctionsToGoodsStateKey FOREIGN KEY ([GoodStateId])
		REFERENCES GoodsState ([Id])
)
