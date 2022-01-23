"""[Participant] fix: re-add participant

Revision ID: aaf016c50cfd
Revises: 23f7e64b029a
Create Date: 2021-10-01 22:33:23.814075

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aaf016c50cfd'
down_revision = '23f7e64b029a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('participants',
    sa.Column('id', sa.String(length=150), nullable=False),
    sa.Column('roomId', sa.String(length=150), nullable=False),
    sa.Column('userId', sa.String(length=150), nullable=False),
    sa.Column('dateJoined', sa.Text(), nullable=False),
    sa.Column('isAdmin', sa.SmallInteger(), nullable=True),
    sa.ForeignKeyConstraint(['roomId'], ['room.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('participants')
    # ### end Alembic commands ###
