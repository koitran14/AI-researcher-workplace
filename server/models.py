from sqlalchemy import LargeBinary,Column, ForeignKey, Integer, String, Table, DateTime
from db import Base

from sqlalchemy.orm import relationship

user_project_association = Table(
    'user_project_association',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('project_id', Integer, ForeignKey('projects.id')),
    Column('role_id', Integer, ForeignKey('roles.id'))
)

field_user_association = Table(
    'field_user_association',
    Base.metadata,
    Column('field_id', Integer, ForeignKey('fields.id')),
    Column('user_id', Integer, ForeignKey('users.id'))
)

favorite_association = Table(
    'favorite_association',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('fav_user_id', Integer, ForeignKey('users.id'), primary_key=True)
)

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(60))
    
    firstName = Column(String(60))
    lastName = Column(String(60))
    dob = Column(DateTime)
    avatar = Column(String(100))
    bio = Column(String(350))
    
    roleName = Column(String(50), ForeignKey('roles.title'))
    role = relationship("Role", back_populates="users", overlaps="roles, participants")

    fields = relationship('Field', secondary=field_user_association, back_populates='users')
    projects = relationship('Project', back_populates='participants', secondary=user_project_association, overlaps="roles,role")
    roles = relationship('Role', secondary=user_project_association, back_populates='users', overlaps="projects,role")

    # Self-referential many-to-many relationship for favorites
    favorites = relationship(
        'User',
        secondary=favorite_association,
        primaryjoin=id == favorite_association.c.user_id,
        secondaryjoin=id == favorite_association.c.fav_user_id,
        backref='favored_by'
    )


class Role(Base):
    __tablename__ = 'roles'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50), unique=True, index=True)

    role = relationship('User', secondary=user_project_association, back_populates='roles', overlaps="projects,participants")
    users = relationship("User", back_populates="role")

class Project(Base):
    __tablename__ = 'projects'
        
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(60), index=True)
    description = Column(String(350))
    thumbnail = Column(LargeBinary)
    report = Column(LargeBinary) 
    goal = Column(String(350))
    purposes = Column(String(350))
    
    #many-to-many
    participants = relationship('User', back_populates='projects', secondary=user_project_association, overlaps="roles,role")
    
    #many-to-one
    attributes = relationship("Attribute", back_populates='project')
    
class Attribute(Base):
    __tablename__ = 'attributes'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(350), index=True)
    content = Column(String(350))
    
    project_id = Column(Integer, ForeignKey('projects.id'))
    project = relationship('Project', back_populates='attributes')
    
class Field(Base):
    __tablename__ = 'fields'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(350), index=True)
    
    users = relationship('User', back_populates='fields', secondary=field_user_association)
