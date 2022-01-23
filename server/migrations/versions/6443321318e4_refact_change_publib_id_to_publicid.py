"""refact: change publib_id to publicId

Revision ID: 6443321318e4
Revises: 3002b740508d
Create Date: 2021-09-22 10:07:51.351500

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6443321318e4'
down_revision = '3002b740508d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('room', 'public_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('room', sa.Column('public_id', mysql.INTEGER(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
