CREATE TABLE [dbo].[AspNetUserLogins]
(
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,

	CONSTRAINT primaryAspNetUserLoginsKey PRIMARY KEY ([LoginProvider], [ProviderKey], [UserId]),
	CONSTRAINT foreignAspNetUserLoginsToAspNetUsersKey FOREIGN KEY ([UserId])
		REFERENCES [AspNetUsers] ([Id])
)
