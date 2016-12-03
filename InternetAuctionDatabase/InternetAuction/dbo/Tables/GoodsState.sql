CREATE TABLE [dbo].[GoodsState]
(
	[Id] INT NOT NULL IDENTITY(1,1),
	[Name] NVARCHAR(20) NOT NULL,

	CONSTRAINT [primaryGoodsStateKey] PRIMARY KEY ([Id])
)
