// node.mapper.ts

export function mapNodeRelation(r: any) {
    return {
        id: r.to_node_id,
        node: r.nodes_node_relations_to_node_idTonodes
    }
}