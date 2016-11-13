CREATE TABLE [dbo].[Clients]
(
	[Id] INT IDENTITY(1,1) NOT NULL,
	[FirstName] NVARCHAR(50) NOT NULL,
	[LastName] NVARCHAR(100) NOT NULL,
	[Patronymic] NVARCHAR(100) NULL,

	CONSTRAINT [primaryClientKey] PRIMARY KEY ([Id])
)
