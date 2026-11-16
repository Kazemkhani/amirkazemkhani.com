"""Original portfolio sculpture. Decorative geometry, never product measurements."""
import bpy, math
from mathutils import Vector
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'client/public/worlds'
OUT.mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

def material(name, color, metallic=0, rough=.3):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
    bs=m.node_tree.nodes.get('Principled BSDF')
    bs.inputs['Base Color'].default_value=(*color,1)
    bs.inputs['Metallic'].default_value=metallic
    bs.inputs['Roughness'].default_value=rough
    return m

ivory=material('Porcelain',(.91,.90,.83),.15,.23)
teal=material('Mineral teal',(.19,.66,.56),.35,.22)
coral=material('Coral ceramic',(.94,.36,.22),.15,.24)
blue=material('Cornflower',(.30,.48,.9),.28,.22)
ink=material('Deep teal',(.055,.18,.18),.1,.35)
glass=material('Pearl',(.66,.86,.84),.65,.12)

def finish(o,name,mat):
    o.name=name; o.data.materials.append(mat)
    for p in o.data.polygons:p.use_smooth=True
    return o
def cube(name,loc,scale,mat,bevel=.1):
    bpy.ops.mesh.primitive_cube_add(size=1,location=loc); o=bpy.context.object
    o.scale=scale; bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    if bevel:
        m=o.modifiers.new('Soft corners','BEVEL');m.width=bevel;m.segments=3
        o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
    return finish(o,name,mat)
def sphere(name,loc,r,mat):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32,ring_count=20,radius=r,location=loc)
    return finish(bpy.context.object,name,mat)
def torus(name,loc,r,t,mat,rot=(math.pi/2,0,0)):
    bpy.ops.mesh.primitive_torus_add(major_segments=96,minor_segments=20,location=loc,rotation=rot,major_radius=r,minor_radius=t)
    return finish(bpy.context.object,name,mat)
def cylinder(name,loc,r,depth,mat):
    bpy.ops.mesh.primitive_cylinder_add(vertices=64,radius=r,depth=depth,location=loc)
    return finish(bpy.context.object,name,mat)

# Three sculptural gateways share one small floating landscape.
cube('floating plinth',(0,0,-.28),(5.8,3.4,.45),ivory,.20)
torus('bayyina portal',(-.3,.3,1.8),1.50,.24,teal,(math.pi/2,0,-.13))
torus('inner pearl',(-.3,.35,1.8),1.23,.035,glass,(math.pi/2,0,-.13))
torus('marsad portal',(1.95,.45,.9),.72,.12,blue,(math.pi/2,.18,-.3))
torus('enec portal',(-2.08,-.4,.73),.62,.13,coral,(math.pi/2,-.1,.22))
cylinder('Bayyina island',(-.3,.1,.12),1.16,.25,ivory)
for x,y,h in [(-.85,.2,.48),(-.3,.42,.7),(.27,.28,.38)]:
    cube('evidence block',(x,y,.3+h/2),(.38,.4,h),glass,.055)
    cube('sealed face',(x,y-.211,.35+h/2),(.23,.025,.15),teal,.01)
    sphere('evidence light',(x,y,.35+h),.04,coral)
# An abstract aircraft in the blue world, deliberately not an airport model.
plane=cube('aircraft body',(1.95,.18,.56),(.11,.88,.1),ivory,.06)
wing=cube('aircraft wing',(1.95,.18,.57),(.8,.2,.045),ivory,.025);wing.rotation_euler[2]=-.2
cube('aircraft tail',(1.95,.5,.66),(.06,.16,.23),ivory,.025)
# A marine-inspired jellyfish within the coral gateway.
j=sphere('marine bell',(-2.08,-.42,.72),.22,glass);j.scale.z=.65
for i in range(5):
    a=i*math.tau/5
    cube('marine filament',(-2.08+math.cos(a)*.10,-.42+math.sin(a)*.1,.48),(.018,.018,.32),coral,.008)
for i,(x,y,z,r,mat) in enumerate([(1.2,-1.1,.24,.16,coral),(-1.3,-1.1,.42,.13,blue),(1.35,.8,1.8,.16,glass),(-1.7,.4,2.8,.12,ivory)]):
    sphere('satellite '+str(i),(x,y,z),r,mat)

# Export only the artwork. Lighting is independently configured at runtime.
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=str(OUT/'portals.glb'),export_format='GLB',use_selection=True,export_apply=True)
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.53));floor=bpy.context.object;floor.is_shadow_catcher=True
floor.data.materials.append(material('Backdrop',(.95,.94,.90),0,.8))
world=bpy.context.scene.world;world.use_nodes=True
world.node_tree.nodes['Background'].inputs[0].default_value=(.90,.94,1,1)
world.node_tree.nodes['Background'].inputs[1].default_value=.6
for loc,power,size in [((1,-4,7),1300,5),((-5,-1,4),800,4),((2,4,5),1100,3)]:
    bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.data.energy=power;o.data.shape='DISK';o.data.size=size
    o.rotation_euler=(Vector((0,0,1))-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(6.6,-10,7.1));cam=bpy.context.object
cam.rotation_euler=(Vector((0,0,1.2))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=8.2
scene=bpy.context.scene;scene.camera=cam;scene.render.engine='CYCLES';scene.cycles.samples=32
scene.cycles.use_denoising=True
scene.render.resolution_x=1200;scene.render.resolution_y=1050;scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX';scene.render.image_settings.file_format='PNG'
scene.render.film_transparent=True
scene.render.filepath=str(OUT/'portals.png')
bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(OUT.parents[2]/'scripts/artwork/portals.blend'))
bpy.ops.render.render(write_still=True)
print('PORTAL MODEL AND RENDER COMPLETE')
