CREATE TABLE [dbo].[Auction]
(
	[Id] INT IDENTITY(1,1) NOT NULL,
	[Name] NVARCHAR(50) NOT NULL,
	[Description] NVARCHAR(1000) NULL,
	[Price] DECIMAL NOT NULL,
	[PriceOfFastSell] DECIMAL NULL,
	[CategoryId] SMALLINT NOT NULL,
	[StartDate] DATETIME NOT NULL,
	[EndDate] DATETIME NOT NULL,
	[ClientId] INT NOT NULL,

	CONSTRAINT primaryAuctionKey PRIMARY KEY ([Id]),
	CONSTRAINT foreignAuctionToCategoriesKey FOREIGN KEY ([CategoryId])
		REFERENCES AuctionCategories ([Id]),
	CONSTRAINT foreignAuctionToClientsKey FOREIGN KEY ([ClientId])
		REFERENCES Clients ([Id])
)
