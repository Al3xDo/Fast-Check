"""feat: add room database and participants

Revision ID: 4401b7e2330e
Revises: 8988254380ab
Create Date: 2021-09-21 19:37:26.140449

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4401b7e2330e'
down_revision = '8988254380ab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('room',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('dateDelta', sa.Text(), nullable=True),
    sa.Column('timeEnd', sa.Text(), nullable=True),
    sa.Column('timeStart', sa.Text(), nullable=True),
    sa.Column('code', sa.Text(), nullable=True),
    sa.Column('password', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('participants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('roomID', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('dateJoined', sa.Text(), nullable=False),
    sa.ForeignKeyConstraint(['roomID'], ['room.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_unique_constraint(None, 'user', ['password_hash'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_table('participants')
    op.drop_table('room')
    # ### end Alembic commands ###
