"""add participantNumber on room database

Revision ID: f08e75154a51
Revises: aaf016c50cfd
Create Date: 2021-10-06 15:37:22.736120

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'f08e75154a51'
down_revision = 'aaf016c50cfd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('room', sa.Column('numOfStudent', sa.Integer(), nullable=True))
    op.drop_column('room', 'participantNumber')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('room', sa.Column('participantNumber', mysql.INTEGER(), autoincrement=False, nullable=True))
    op.drop_column('room', 'numOfStudent')
    # ### end Alembic commands ###
