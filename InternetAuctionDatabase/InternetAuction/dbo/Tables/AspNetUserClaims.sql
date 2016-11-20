CREATE TABLE [dbo].[AspNetUserClaims]
(
	[Id] [INT] IDENTITY(1,1) NOT NULL,
	[UserId] [NVARCHAR](128) NOT NULL,
	[ClaimType] [NVARCHAR](max) NULL,
	[ClaimValue] [NVARCHAR](max) NULL,

	CONSTRAINT primaryAspNetUserClaimsKey PRIMARY KEY ([Id]),
	CONSTRAINT foreignAspNetUserClaimsToAspNetUsersKey FOREIGN KEY ([UserId])
		REFERENCES [AspNetUsers] ([Id])
)
