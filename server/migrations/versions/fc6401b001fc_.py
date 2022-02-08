"""empty message

Revision ID: fc6401b001fc
Revises: bdac687f0996
Create Date: 2022-01-26 15:51:52.736409

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'fc6401b001fc'
down_revision = 'bdac687f0996'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('password_hash', table_name='user')
    op.drop_column('user', 'password_hash')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('password_hash', mysql.VARCHAR(length=100), nullable=False))
    op.create_index('password_hash', 'user', ['password_hash'], unique=True)
    # ### end Alembic commands ###
