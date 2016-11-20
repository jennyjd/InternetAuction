CREATE TABLE [dbo].[AspNetUserRoles]
(
	[UserId] [nvarchar](128) NOT NULL,
	[RoleId] [nvarchar](128) NOT NULL,

	CONSTRAINT primaryAspNetUserRolesKey PRIMARY KEY ([UserId], [RoleId]),
	CONSTRAINT foreignAspNetUserRolesToAspNetRolesKey FOREIGN KEY ([RoleId])
		REFERENCES [AspNetRoles] ([Id]),
	CONSTRAINT foreignAspNetUserRolesToAspNetUsersKey FOREIGN KEY ([UserId])
		REFERENCES [AspNetUsers] ([Id])
)
