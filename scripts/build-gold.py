"""Decorative Gold Hedge still life. No product data or prices are depicted."""
import bpy, math
from mathutils import Vector
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'client/public/worlds'
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
def material(name,colour,metal=0,rough=.3):
 m=bpy.data.materials.new(name);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*colour,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough;return m
gold=material('Brushed champagne gold',(.8,.52,.16),.92,.24)
silver=material('Satin silver',(.65,.71,.74),.95,.21)
ivory=material('Warm stone',(.79,.75,.61),0,.5)
for i,(loc,rot) in enumerate([((-1.1,0,.4),(0,0,-.15)),((.8,.1,.4),(0,0,.12)),((-.1,.2,1.1),(.12,-.1,-.25)),((.3,.2,2),(.2,.3,.65))]):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc,rotation=rot);o=bpy.context.object;o.name='Sculptural ingot '+str(i);o.scale=(2.2,1.05,.55);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(gold if i!=2 else silver);b=o.modifiers.new('Soft machined edge','BEVEL');b.width=.14;b.segments=6;o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
for radius,loc,rot in [(2.3,(0,.4,1.2),(1.1,.2,.3)),(2.8,(0,.4,1.2),(1.3,-.4,-.3))]:
 bpy.ops.mesh.primitive_torus_add(major_radius=radius,minor_radius=.025,major_segments=128,minor_segments=12,location=loc,rotation=rot);bpy.context.object.data.materials.append(gold)
 for p in bpy.context.object.data.polygons:p.use_smooth=True
bpy.ops.mesh.primitive_plane_add(size=200);bpy.context.object.data.materials.append(ivory)
for loc,power,size in [((0,-4,7),1600,5),((5,2,5),2000,4),((-5,0,3),1000,3)]:
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.data.energy=power;o.data.shape='DISK';o.data.size=size;o.rotation_euler=(Vector((0,0,1))-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(5,-8,5.6));cam=bpy.context.object;cam.rotation_euler=(Vector((0,0,1.1))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=8.2
s=bpy.context.scene;s.camera=cam;s.render.engine='CYCLES';s.cycles.samples=48;s.cycles.use_denoising=True;s.world.color=(.25,.25,.25);s.render.resolution_x=1440;s.render.resolution_y=1000;s.render.resolution_percentage=100;s.view_settings.view_transform='AgX';s.render.image_settings.file_format='PNG';s.render.filepath=str(OUT/'gold.png');bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'scripts/artwork/gold.blend'));bpy.ops.render.render(write_still=True)
print('GOLD STILL LIFE RENDERED')
