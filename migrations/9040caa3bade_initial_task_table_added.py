"""Initial task table added

Revision ID: 9040caa3bade
Revises: 7caa9899facd
Create Date: 2020-08-14 15:57:08.813996

"""
from alembic import op
import sqlalchemy as sa
import backend


# revision identifiers, used by Alembic.
revision = '9040caa3bade'
down_revision = '7caa9899facd'
branch_labels = ()
depends_on = None


def upgrade():

    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('task',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('title', sa.String(length=64), nullable=True),
    sa.Column('description', sa.String(length=256), nullable=True),
    sa.Column('status', sa.Enum('Deleted', 'Pending', 'Completed', 'Archived', name='taskstatus'), nullable=False),
    sa.Column('start_date', backend.database.types.DateTime(timezone=True), nullable=False),
    sa.Column('end_date', backend.database.types.DateTime(timezone=True), nullable=False),
    sa.Column('predicted_cost', sa.Numeric(), nullable=False),
    sa.Column('actual_cost', sa.Numeric(), nullable=False),
    sa.Column('production_id', sa.BigInteger(), nullable=False),
    sa.Column('task_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.Column('ordering', sa.Integer(), nullable=False),
    sa.Column('task_name', sa.Unicode(length=100), nullable=False),
    sa.Column('task_type', sa.Unicode(length=30), nullable=False),
    sa.ForeignKeyConstraint(['parent_id'], ['task.task_id'], name=op.f('fk_task_parent_id_task'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['production_id'], ['production.id'], name=op.f('fk_task_production_id_production'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('task_id', name=op.f('pk_task')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('task_general',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['task.task_id'], name=op.f('fk_task_general_id_task'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_task_general')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('task_pruning',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['task.task_id'], name=op.f('fk_task_pruning_id_task'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_task_pruning')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.drop_constraint('fk_field_detail_production_field_detail_id_field_detail', 'field_detail_production', type_='foreignkey')
    op.drop_constraint('fk_field_detail_production_production_id_production', 'field_detail_production', type_='foreignkey')
    op.create_foreign_key(op.f('fk_field_detail_production_field_detail_id_field_detail'), 'field_detail_production', 'field_detail', ['field_detail_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.create_foreign_key(op.f('fk_field_detail_production_production_id_production'), 'field_detail_production', 'production', ['production_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(op.f('fk_field_detail_production_production_id_production'), 'field_detail_production', type_='foreignkey')
    op.drop_constraint(op.f('fk_field_detail_production_field_detail_id_field_detail'), 'field_detail_production', type_='foreignkey')
    op.create_foreign_key('fk_field_detail_production_production_id_production', 'field_detail_production', 'production', ['production_id'], ['id'])
    op.create_foreign_key('fk_field_detail_production_field_detail_id_field_detail', 'field_detail_production', 'field_detail', ['field_detail_id'], ['id'])
    op.create_table('spatial_ref_sys',
    sa.Column('srid', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('auth_name', sa.VARCHAR(length=256), autoincrement=False, nullable=True),
    sa.Column('auth_srid', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('srtext', sa.VARCHAR(length=2048), autoincrement=False, nullable=True),
    sa.Column('proj4text', sa.VARCHAR(length=2048), autoincrement=False, nullable=True),
    sa.CheckConstraint('(srid > 0) AND (srid <= 998999)', name='spatial_ref_sys_srid_check'),
    sa.PrimaryKeyConstraint('srid', name='spatial_ref_sys_pkey')
    )
    op.drop_table('task_pruning')
    op.drop_table('task_general')
    op.drop_table('task')
    # ### end Alembic commands ###