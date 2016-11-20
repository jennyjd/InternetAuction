CREATE TABLE [dbo].[AspNetRoles]
(
	[Id] [NVARCHAR](128) NOT NULL,
	[Name] [NVARCHAR](256) NOT NULL,
	[Discriminator] [NVARCHAR](128) NOT NULL,

	CONSTRAINT primaryAspNetRolesKey PRIMARY KEY ([Id])
)
